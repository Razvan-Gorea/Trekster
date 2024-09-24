from django.contrib.auth.models import Group, User
from rest_framework import serializers
from .models import Testing, Attractions, Trails, ttShape


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class TestingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Testing
        fields = ['id', 'name', 'size', 'position']

class AttractionsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Attractions
        fields = ['name', 'url', 'telephone', 'latitude', 'longitude', 'addressRegion', 'addressLocality', 'addressCounty', 'tags']

class TrailsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Trails
        fields = '__all__'

class ttShapeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ttShape
        fields = '__all__'
