# Generated by Django 3.1.1 on 2021-04-06 07:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Rcd',
            fields=[
                ('m_no', models.IntegerField(auto_created=True, primary_key=True, serialize=False)),
                ('m_title', models.TextField()),
                ('m_genre', models.TextField()),
                ('m_artist', models.TextField()),
                ('m_album', models.TextField()),
                ('m_preview', models.TextField()),
                ('m_img', models.TextField()),
                ('m_popularity', models.TextField()),
                ('m_id', models.CharField(max_length=200)),
                ('m_artist_id', models.TextField()),
                ('m_album_id', models.TextField()),
                ('cnt', models.IntegerField()),
                ('m_emotion', models.TextField()),
                ('m_date', models.TextField()),
                ('m_url', models.TextField()),
            ],
            options={
                'db_table': 'music',
                'managed': False,
            },
        ),
    ]