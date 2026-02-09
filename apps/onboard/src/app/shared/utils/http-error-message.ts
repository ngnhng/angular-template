export function toErrorMessage(err: unknown): string {
	if (err && typeof err === 'object' && 'message' in err && typeof err.message === 'string') {
		return err.message
	}
	return 'Request failed. Ensure backend is running on http://localhost:8080.'
}
