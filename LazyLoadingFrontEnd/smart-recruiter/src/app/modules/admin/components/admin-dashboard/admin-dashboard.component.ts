import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Job } from 'src/app/shared/models';
import { JobPostService } from 'src/app/shared/services/job-post.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  visible : boolean = false;
  jobs: any[] = [];
  filteredJobs: any[] = [];

  job : Job = {title : '', description : '',noOfAvailablePositions : 1, location : '', department : '', activeStatus : true, attitudeAndDiscipline : 1, technicalKnowledge : 1, educationBackground : 1, professionalQualification : 1, careerBackground : 1, communicationSkills : 1, culturalFit : 1, familyBackground : 1, iqCreativityProblemSolvingSkills : 1, managementSkills : 1};

  
  constructor( private jobPostSvc : JobPostService, protected AuthSvc : AuthenticationService, private cdr: ChangeDetectorRef) { }


  ngOnInit(){
    this.jobPostSvc.getAllJobs().subscribe(jobs => {this.jobs = jobs; this.filteredJobs = jobs;});
  }
  // Add New button popup control
  showDialog(){
    this.visible = true;
    this.cdr.detectChanges();
  }

  cancelPopUp(){
    this.visible = false;
    this.cdr.detectChanges();
    //console.log(this.visible);
  }

  filterGlobal(event: Event){
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value.toLowerCase();
    
    this.filteredJobs = this.jobs.filter(job =>
      job.title.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.department.toLowerCase().includes(query)
    );
    this.cdr.detectChanges();
  }

  addJob(){
    this.jobPostSvc.addJob(this.job).subscribe((res) => {
      //console.log(res);
      this.jobs.push(res);
      this.filteredJobs = this.jobs;
    });
    this.visible = false;
    this.cdr.detectChanges();
    //console.log(this.visible);
    // Reset the form
  }

}
