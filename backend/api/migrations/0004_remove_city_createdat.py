# Generated by Django 3.2.3 on 2022-03-18 16:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20220318_1624'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='city',
            name='createdAt',
        ),
    ]
