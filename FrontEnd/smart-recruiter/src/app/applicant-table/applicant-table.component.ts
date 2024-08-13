import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Table } from 'primeng/table';
import { ApplicantsListService } from '../services/applicants-list.service';
import { ActivatedRoute } from '@angular/router';
import { Applicant } from '../models/applicants.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-applicant-table',
  templateUrl: './applicant-table.component.html',
  styleUrls: ['./applicant-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ApplicantTableComponent implements OnInit {
  customers: any[] = [];
  loading: boolean = true;
  // commentExceeded = false;
  position: string = '';
  jobId!: number;  // Declare jobId as a class property
  adminId!: number;

  @ViewChild('dt2') dt2!: Table; // ViewChild to access the p-table

  constructor(private applicantsListService: ApplicantsListService, 
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) { }

  // ngOnInit() {
  //   const JobId = 1;   // JobId is hardcoded for now  *********************************
  //   this.applicantsListService.getPositionName(JobId).subscribe(position => {
  //     this.position = position;	
  //   });
  //   this.applicantsListService.getAllApplicants(JobId).subscribe(customers => {
  //     this.customers = customers; 
  //     console.log(this.customers);
  //   });
  //   // this.customers = this.applicantsListService.getCustomers();
  //   // this.loading = this.applicantsListService.isLoading();
  // }

  ngOnInit() {
    // Get the jobId from the route parameters
    this.route.queryParamMap.subscribe(params => {
      this.jobId = +params.get('jobId')!;    // + => converts the string to a number
      this.loadAdminId();
      this.loadData();  
    });
  }

  loadAdminId(){
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.getAdminIdfromEmail(currentUser.email);
    }
  }

  loadData() {
    this.applicantsListService.getPositionName(this.jobId).subscribe(position => {
      this.position = position;	
    });
    this.applicantsListService.getAllApplicants(this.jobId).subscribe(customers => {
      this.customers = customers; 
    });
  }

  filterGlobal(event: Event, matchMode: string) {
    const inputElement = event.target as HTMLInputElement;   // here event.target -> input element (treat the event target as an HTML input element)
    this.dt2.filterGlobal(inputElement.value, matchMode);
  }

  handleWordLimitExceeded(id:number, exceeded: boolean) {
    this.applicantsListService.updateCommentExceeded(id, exceeded);
  }

  checkCommentExist(jobId: number, candidateId: number) {
    this.applicantsListService.existComment(jobId, candidateId).subscribe((exists) => {
        const customer = this.customers.find(c => c.id === candidateId);
        if (customer) {
          customer.commentEditable = !exists;
        }
      }
    );
  }

  getAdminIdfromEmail(email: string) {
    this.applicantsListService.getAdminId(email).subscribe(adminId => {
      this.adminId = adminId;
    });
  }

  submitComment(customer: Applicant) {
    if (customer.id && customer.comment !== undefined) {
      this.applicantsListService.updateComment(this.jobId, customer.id, this.adminId, customer.comment).subscribe(
        (response) => {
          customer.commentEditable = false;
        },
        error => {
          console.log('Error in updating comment', error);
        }
      );
    } else {
      console.error('Missing required properties in customer object');
    }
  }

}
