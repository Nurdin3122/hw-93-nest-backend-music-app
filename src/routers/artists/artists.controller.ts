import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Artist, ArtistDocument } from '../../schemas/artists.schema';
import { Model } from 'mongoose';
import { CreateArtistDto } from './create-artist.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { NotFoundError } from 'rxjs';

@Controller('artists')
export class ArtistsController {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<ArtistDocument>,
  ) {}

  @Get()
  async getAll() {
    return this.artistModel.find();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const artist = await this.artistModel.findOne({ _id: id });
    if (!artist) {
      throw new NotFoundError('artist is not found');
    }
    return artist;
  }

  @Post()
  @UseInterceptors(FileInterceptor('image',{dest:"./public/images"}))
  async createArtist(@Body() artistDto:CreateArtistDto,@UploadedFile() file:Express.Multer.File) {

    return await this.artistModel.create({
      name: artistDto.name,
      description: artistDto.description,
      image: file ? 'images/' + file.filename : null,
    })
  }

  @Delete(':id')
  async deleteArtist(@Param('id') id: string) {
    const deletedArtist = await this.artistModel.findByIdAndDelete(id);
    if (!deletedArtist) {
      throw new NotFoundError('Artist not found');
    }
    return 'Artist has deleted';
  }

}


