import { Injectable } from '@angular/core';
import { Mark } from '../models/mark.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlidersService {

  private hasNonNullMark : boolean = false;
  private roleId! : number | undefined
  public isMarkSaved : boolean = false;  // confimation popup that mark is saved

  constructor(private http : HttpClient) { }
  //display savedcomment
//   public getComments(jobId:number, candidateId:number):Observable<any>{
//     return this.http.get('api/Comment/comment/${jobId}/${candidateId}')

//  }

  
  public async saveComment(comment : string | undefined, jobId : number, candidateId : number) : Promise<void> {
    if (comment){ // If comment has non empty string this is going to store the comment

      // write the logic to fetch admin id
      const adminId = 1;
      // Take the RoleId of a candidate by Candidate Id
      const data : Observable<number> = this.http.get<number>(`api/Candidate/getRoleIdByCandidateId/${candidateId}`);
      this.roleId = await firstValueFrom(data);

      this.http.post (`api/Comment/${jobId}/${candidateId}/${adminId}/${this.roleId}`, {commentText: comment}).subscribe(
        {
          next: (response) => {
            // write the next action after successfully saving the comment.
            //console.log(response);
          },
          error: (error) => { 
            console.log(error) 
          }
        }
      );
    }
    else{
      //console.log("No comment");
    }
  }

  public async saveMarks(marks : Mark[], jobId : number, candidateId : number){

    // Take the RoleId of a candidate by Candidate Id
    const data : Observable<number> = this.http.get<number>(`api/Candidate/getRoleIdByCandidateId/${candidateId}`);
    this.roleId = await firstValueFrom(data);

    const criteriaMapping: { [key: string]: string } = {
      "Attitude and Discipline": "AttitudeAndDiscipline",
      "Technical Knowledge": "TechnicalKnowledge",
      "Education Background": "EducationBackground",
      "Professional Qualification": "ProfessionalQualification",
      "Carrier Background": "CareerBackground",
      "Communication Skills": "CommunicationSkills",
      "Cultrul fit": "CulturalFit",
      "Family Background": "FamilyBackground",
      "IQ/Creativity/Problem Solving Skill": "IQCreativityProblemSolvingSkills",
      "Management  Skills": "ManagementSkills"
    };

    // Check if any mark is not null
    this.hasNonNullMark = marks.some(mark => mark.value !== null);
    if (this.hasNonNullMark){
      //console.log(marks);
      marks.forEach(mark => {       
        if (mark.criteria !== undefined) {
          mark.criteria = criteriaMapping[mark.criteria];
        }
      });

      type Accumulator = {
        [key: string]: number | null | undefined;
      };

      let data = marks.reduce<Accumulator>((acc, mark) => {
        if (mark.criteria !== undefined) {
          acc[mark.criteria] = mark.value;
        }
        return acc;
      }, {});
      data["AdminId"] = 1;
      data["CandidateId"] = candidateId;
      data["RoleId"] = this.roleId;
      data["JobId"] = jobId;

      // save the candidate mark
      this.http.post('api/Mark', data).subscribe(
        {
          next: (response) => {
            // response will be true if the mark is saved successfully
            if (response){
              this.isMarkSaved = true;
              setTimeout(() => {
                this.isMarkSaved = false;
              }, 2000);
            }
          },
          error: (error) => {
            console.log(error)
          }
        }
      );
    }
    this.hasNonNullMark = false;
  }
  
}
