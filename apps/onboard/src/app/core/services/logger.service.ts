import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class LoggerService {
	error(message: string, meta?: unknown): void {
		console.error(message, meta)
	}
}
