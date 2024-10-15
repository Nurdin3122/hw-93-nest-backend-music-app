import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsController } from './routers/artists/artists.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from './schemas/artists.schema';
import { AlbumsController } from './routers/albums/albums.controller';
import { TracksController } from './routers/tracks/tracks.controller';
import { Album, AlbumSchema } from './schemas/albums.schema';
import { Track, TrackSchema } from './schemas/tracks.schema';
import { User, UserSchema } from './schemas/users.shema';
import { UsersController } from './routers/users/users.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/music'),
    MongooseModule.forFeature([
      { name: Artist.name, schema: ArtistSchema },
      { name: Album.name, schema: AlbumSchema },
      { name: Track.name, schema: TrackSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [
    AppController,
    ArtistsController,
    AlbumsController,
    TracksController,
    UsersController,
  ],
  providers: [AppService],
})
export class AppModule {}
