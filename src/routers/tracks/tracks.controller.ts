import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Track, TrackDocument } from "../../schemas/tracks.schema";
import { NotFoundError } from "rxjs";
import { CreateTrackDto } from "./create-track.dto";

@Controller('tracks')
export class TracksController {
  constructor(@InjectModel(Track.name) private trackModel:Model<TrackDocument>) {}

  @Get()
  async getAll() {
    return this.trackModel.find();
  }

  @Get(":id")
  async getOne(@Param('id') id: string) {
    const track = await this.trackModel.findOne({_id:id});
    if(!track) {
      throw new NotFoundError('Track is not found');
    }
    return track
  }


  @Post()
  async createArtist(@Body() trackDto: CreateTrackDto) {
    return await this.trackModel.create({
      name: trackDto.name,
      album: trackDto.album,
      length: trackDto.length,
      number: trackDto.number,
    })
  }


  @Delete(':id')
  async deleteTrack(@Param('id') id: string) {
    const deletedTrack = await this.trackModel.findByIdAndDelete(id);
    if (!deletedTrack) {
      throw new NotFoundError('track not found');
    }
    return 'track has deleted';
  }


}
