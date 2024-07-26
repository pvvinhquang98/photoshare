from django.utils.deprecation import MiddlewareMixin


class CsrfExemptMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if request.path == "/admin/":
            request.csrf_processing_done = True
