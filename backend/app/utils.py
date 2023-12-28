from django.http import JsonResponse
from enum import Enum
from bson import ObjectId
from bson.json_util import dumps, loads
import json
import logging

# Response Format JSON
#   error: boolean
#   data: any
#   message: string

class REQUEST_TYPE(Enum):
    GET = 'GET'
    POST = 'POST'
    PUT = 'PUT'
    DELETE = 'DELETE'

def ServerResponseHandler(
        request,
        type: REQUEST_TYPE,
        body_function,
        ServerErrorMessage="SERVER ERROR",
        NotFoundErrorMessage="VIEW NOT FOUND",
        OKMessage="SUCCESSFUL"):
    logger = logging.getLogger(__name__)
    try:
        if request.method == type.value:
            data = body_function(request)
            response = {
                "error": False,
                "data": json.loads(dumps(data)),
                "message": OKMessage
            }
            logger.info(response)
            return JsonResponse(response, status=200)
        else:
            return JsonResponse({
                "error": True,
                "data": None,
                "message": NotFoundErrorMessage
            }, status=404)
    except Exception as e:
        logger.exception(f"Exception: {e}")
        return JsonResponse({
            "error": True,
            "data": None,
            "message": ServerErrorMessage
        }, status=500)