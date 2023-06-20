import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatService } from './cat.service';
import { CatResolver } from './cat.resolver';
import { Cat, CatSchema } from './cat.schema';
import { Owner, OwnerSchema } from 'src/owner/owner.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema },{name:Owner.name, schema: OwnerSchema}])],
    providers: [CatService, CatResolver],
})
export class CatModule {}