from django.contrib.auth.models import Group, User
from .models import Testing, Attractions, Trails, ttShape
from django.shortcuts import render
from rest_framework import permissions, viewsets
from django_filters import rest_framework as filters

from trekster.trekster_app.serializers import GroupSerializer, UserSerializer, TestingSerializer, AttractionsSerializer, TrailsSerializer, ttShapeSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

class TestingViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Testing.objects.all()
    serializer_class = TestingSerializer
    permission_classes = [permissions.IsAuthenticated]

class AttractionsViewSet(viewsets.ModelViewSet):
    """
    API endpoint which allows the viewing or editing of attractions
    """
    queryset = Attractions.objects.all()
    serializer_class = AttractionsSerializer
    # permission_classes = [permissions.IsAuthenticated]

class TrailsViewSet(viewsets.ModelViewSet):
    """
    API endpoint which allows the viewing or editing of trails
    """
    serializer_class = TrailsSerializer
    filter_backends = (filters.DjangoFilterBackend,)  # Make sure to include a comma to make it a tuple
    filterset_fields = ['Name', 'OBJECTID', 'TrailID']
    queryset = Trails.objects.all()
    # permission_classes = [permissions.IsAuthenticated]

class ttShapeViewSet(viewsets.ModelViewSet):
    """
    API endpoint which allows the viewing or editing of shapes
    """
    serializer_class = ttShapeSerializer
    filter_backends = (filters.DjangoFilterBackend,)  # Make sure to include a comma to make it a tuple
    filterset_fields = ['feature_index', 'TrailID']
    queryset = ttShape.objects.all()
