import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core'
import { provideRouter } from '@angular/router'

import { provideApi } from './api'
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor'
import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideRouter(routes),
		provideHttpClient(withInterceptors([httpErrorInterceptor])),
		provideApi({
			basePath: 'http://localhost:8080',
			credentials: {
				XUserIdAuth: 'demo-user',
			},
		}),
	],
}
