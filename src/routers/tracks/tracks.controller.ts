import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Track, TrackDocument } from "../../schemas/tracks.schema";
import { NotFoundError } from "rxjs";
import { CreateTrackDto } from "./create-track.dto";
import { TokenAuthGuard } from '../../auth/token-auth.guard';
import { RoleGuard } from '../../auth/role-auth-guard';

@Controller('tracks')
export class TracksController {
  constructor(@InjectModel(Track.name) private trackModel:Model<TrackDocument>) {}

  @Get()
  async getAll(@Query('albumId') albumId?: string) {
    if (albumId) {
      return this.trackModel.find({ album: albumId });
    }
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

  @UseGuards(TokenAuthGuard)
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
  @UseGuards(RoleGuard)
  async deleteTrack(@Param('id') id: string) {
    const deletedTrack = await this.trackModel.findByIdAndDelete(id);
    if (!deletedTrack) {
      throw new NotFoundError('track not found');
    }
    return 'track has deleted';
  }


}
