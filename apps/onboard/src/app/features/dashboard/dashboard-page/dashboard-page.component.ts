import { Component, OnInit, inject } from '@angular/core'

import { RegistrationFormsStore } from '../data-access/registration-forms.store'

@Component({
	selector: 'app-dashboard-page',
	templateUrl: './dashboard-page.component.html',
	styleUrl: './dashboard-page.component.css',
})
export class DashboardPageComponent implements OnInit {
	protected readonly store = inject(RegistrationFormsStore)

	ngOnInit(): void {
		this.store.refreshForms()
	}
}
