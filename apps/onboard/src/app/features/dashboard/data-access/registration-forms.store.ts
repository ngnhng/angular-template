import { Injectable, inject, signal } from '@angular/core'
import { finalize } from 'rxjs'

import { CreateRegistrationFormRequest, RegistrationForm, RegistrationService } from '../../../api'
import { toErrorMessage } from '../../../shared/utils/http-error-message'

@Injectable({
	providedIn: 'root',
})
export class RegistrationFormsStore {
	private readonly registrationService = inject(RegistrationService)

	readonly loading = signal(false)
	readonly creating = signal(false)
	readonly forms = signal<RegistrationForm[]>([])
	readonly error = signal<string | null>(null)
	readonly lastCreatedId = signal<string | null>(null)

	readonly productCode = signal('HOMELOAN_ONBOARDING_V1')
	readonly applicantName = signal('Nguyen Van A')
	readonly identityNo = signal('012345678901')

	refreshForms(): void {
		this.loading.set(true)
		this.error.set(null)

		this.registrationService
			.listRegistrationForms({ page: 0, size: 20 })
			.pipe(finalize(() => this.loading.set(false)))
			.subscribe({
				next: (result) => {
					this.forms.set(result.items)
				},
				error: (err: unknown) => {
					this.error.set(toErrorMessage(err))
				},
			})
	}

	createSampleForm(): void {
		this.creating.set(true)
		this.error.set(null)

		const payload: CreateRegistrationFormRequest = {
			productCode: this.productCode(),
			formContent: {
				applicantName: this.applicantName(),
				identityNo: this.identityNo(),
				income: { amount: 2500, currency: 'USD' },
				consentAccepted: true,
			},
		}

		this.registrationService
			.createRegistrationForm({
				createRegistrationFormRequest: payload,
				xIdempotencyKey: `demo-${Date.now()}`,
			})
			.pipe(finalize(() => this.creating.set(false)))
			.subscribe({
				next: (created) => {
					this.lastCreatedId.set(created.id ?? null)
					this.refreshForms()
				},
				error: (err: unknown) => {
					this.error.set(toErrorMessage(err))
				},
			})
	}
}
