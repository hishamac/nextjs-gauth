import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Owner, OwnerDocument } from './owner.schema';
import { OwnerInputType } from './owner.dto';


@Injectable()
export class OwnerService {
    constructor(@InjectModel(Owner.name) private ownerModel: Model<OwnerDocument>) {}

    async findAll(): Promise<Owner[]> {
        return this.ownerModel.find().populate({ path: 'cats', select: 'breed characteristics' }).exec();
    }
    async create(createOwnerDto: OwnerInputType): Promise<Owner> {
        const createdOwner = new this.ownerModel(createOwnerDto);
        return createdOwner.save();
    }
    async update(id: string, updateOwnerDto: OwnerInputType): Promise<Owner> {
        return this.ownerModel.findByIdAndUpdate(id, updateOwnerDto);
    }
    async delete(id: string): Promise<Owner> {
        return this.ownerModel.findByIdAndDelete(id);
    }
}