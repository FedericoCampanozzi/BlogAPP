from django.http import JsonResponse
from enum import Enum
from bson.json_util import dumps, loads
import json
import logging
from datetime import date

def convert_to_json(obj):
    """Funzione di conversione personalizzata per gestire le date."""
    if isinstance(obj, date):
        return obj.isoformat()
    raise TypeError(f"Type {type(obj)} not serializable")

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
            body = "{}"
            if(type == REQUEST_TYPE.POST):
                body = request.body
            data = body_function(json.loads(body))
            response = {
                "error": False,
                "data": json.loads(dumps(data,  default=convert_to_json)),
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