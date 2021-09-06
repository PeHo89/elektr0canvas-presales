# Generated by Django 3.2 on 2021-04-17 21:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Frame',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('size', models.IntegerField()),
                ('size_mm', models.CharField(max_length=50)),
                ('category', models.CharField(max_length=200)),
                ('price', models.FloatField()),
                ('description', models.TextField()),
                ('main_image', models.TextField()),
                ('extra_image', models.TextField()),
                ('balance', models.IntegerField(default=150)),
            ],
        ),
        migrations.CreateModel(
            name='Buyer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=200)),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('company', models.CharField(max_length=200)),
                ('address1', models.CharField(max_length=200)),
                ('address2', models.CharField(max_length=200)),
                ('zip_code', models.CharField(max_length=50)),
                ('city', models.CharField(max_length=100)),
                ('country', models.CharField(max_length=100)),
                ('phone', models.CharField(max_length=50)),
                ('frame', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='frame_manager.frame')),
            ],
        ),
    ]
