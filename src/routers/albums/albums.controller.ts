import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Album, AlbumDocument } from "../../schemas/albums.schema";
import { Model } from "mongoose";
import { NotFoundError } from "rxjs";
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAlbumDto } from "./create-album.dto";

@Controller('albums')
export class AlbumsController {
  constructor(@InjectModel(Album.name) private albumModel:Model<AlbumDocument>) {}


  @Get()
  async getAll() {
    return this.albumModel.find();
  }

  @Get(":id")
  async getOne(@Param("id") id:string) {
    const album = await this.albumModel.findOne({_id:id});
    if(!album) {
      throw new NotFoundError("Album is not found")
    }
    return album
  }

  @Post()
  @UseInterceptors(FileInterceptor("image",{dest:"./public/images"}))
  async createAlbum(
    @Body() albumDto:CreateAlbumDto,
    @UploadedFile() file:Express.Multer.File
  ){
    return await this.albumModel.create({
      artist:albumDto.artist,
      title:albumDto.title,
      yearOfProduction:albumDto.yearOfProduction,
      image: file ? "images/" + file.filename : null,
    });
  }


}


