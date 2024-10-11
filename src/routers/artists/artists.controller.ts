import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Artist, ArtistDocument } from "../../schemas/artists.schema";
import { Model } from "mongoose";
import { CreateArtistDto } from "./create-artist.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('artists')
export class ArtistsController {
  constructor(
    @InjectModel(Artist.name) private artistModel:Model<ArtistDocument>,
  ) {}
  @Get()
  async getAll() {
    return this.artistModel.find();
  }

  @Get(":id")
  getOne(@Param("id") id:string) {
    return "Artist id is " + id;
  }

  @Post()
  @UseInterceptors(FileInterceptor('image',{dest:"./public/images"}))
  async createArtist(@Body() artistDto:CreateArtistDto,@UploadedFile() file:Express.Multer.File) {

    return await this.artistModel.create({
      name:artistDto.name,
      description:artistDto.description,
      image:file ? "images/" + file.filename : null,
    })
  }




}


