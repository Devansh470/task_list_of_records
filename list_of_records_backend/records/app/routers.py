
from rest_framework import routers
from .views import *

router = routers.SimpleRouter()
router.register(r'list-records', ListRecordViewSet)
urlpatterns = router.urls