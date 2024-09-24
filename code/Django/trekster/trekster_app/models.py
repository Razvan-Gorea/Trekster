from django.db import models

class Testing(models.Model):
   name = models.TextField()
   size = models.IntegerField()
   position = models.FloatField()


class Attractions(models.Model):
    name = models.CharField(max_length=255, null=False)
    url = models.CharField(max_length=255, null=True)
    telephone = models.CharField(max_length=255, null=True)
    latitude = models.CharField(max_length=255, null=True)
    longitude = models.CharField(max_length=255, null=True)
    addressRegion = models.CharField(max_length=255, null=True)
    addressLocality = models.CharField(max_length=255, null=True)
    addressCounty = models.CharField(max_length=255, null=True)
    tags = models.TextField()

class Trails(models.Model):
    OBJECTID = models.IntegerField(blank=True, null=True)
    GlobalID = models.TextField(primary_key=True)
    Name = models.TextField(blank=True, null=True)
    Latitude = models.FloatField(blank=True, null=True)
    Longitude = models.FloatField(blank=True, null=True)
    Activity = models.TextField(blank=True, null=True)
    Description = models.TextField(blank=True, null=True)
    Website = models.URLField(blank=True, null=True)
    Notes = models.TextField(blank=True, null=True)
    Category = models.TextField(blank=True, null=True)
    County = models.TextField(blank=True, null=True)
    RecordType = models.TextField(blank=True, null=True)
    TrailID = models.IntegerField(blank=True, null=True)
    Registered = models.TextField(blank=True, null=True)
    TrailActivity = models.TextField(blank=True, null=True)
    Format = models.TextField(blank=True, null=True)
    Grade = models.TextField(blank=True, null=True)
    Difficulty = models.TextField(blank=True, null=True)
    TrailType = models.TextField(blank=True, null=True)
    LengthinKm = models.IntegerField(blank=True, null=True)
    TimeToComplete = models.TextField(blank=True, null=True)
    LocationNetwork = models.TextField(blank=True, null=True)
    DogsAllowedOriginal = models.TextField(blank=True, null=True)
    DogsAllowed = models.TextField(blank=True, null=True)
    AscentMetres = models.TextField(blank=True, null=True)
    WalksScheme = models.TextField(blank=True, null=True)
    ManagementOrganisation = models.TextField(blank=True, null=True)
    ExternalLinks = models.TextField(blank=True, null=True)
    NearestTownStart = models.TextField(blank=True, null=True)
    NearestTownFinish = models.TextField(blank=True, null=True)
    StartPoint = models.TextField(blank=True, null=True)
    FinishPoint = models.TextField(blank=True, null=True)
    WaymarkingDescription = models.TextField(blank=True, null=True)
    Facilities = models.TextField(blank=True, null=True)
    GridRefStart = models.TextField(blank=True, null=True)
    GridRefFinish = models.TextField(blank=True, null=True)
    MapGuides = models.TextField(blank=True, null=True)
    OSiMaps = models.TextField(blank=True, null=True)
    PublicTransport = models.TextField(blank=True, null=True)
    Comment = models.TextField(blank=True, null=True)
    DataOwner = models.TextField(blank=True, null=True)
    sourceglobalid = models.TextField(blank=True, null=True)
    TrailHeadType = models.TextField(blank=True, null=True)
    x = models.FloatField(blank=True, null=True)
    y = models.FloatField(blank=True, null=True)

    class Meta:
        db_table = 'trekster_app_trails'

class ttShape(models.Model):
   id = models.AutoField(primary_key=True)
   feature_index = models.IntegerField()
   TrailID = models.IntegerField()

   class Meta:
      db_table = 'trekster_app_trailToShape'
