# Generated by Django 3.2 on 2021-04-18 21:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frame_manager', '0003_auto_20210417_2150'),
    ]

    operations = [
        migrations.CreateModel(
            name='Email',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=200)),
                ('code', models.CharField(max_length=10)),
                ('verified', models.BooleanField(default=False)),
            ],
        ),
    ]
