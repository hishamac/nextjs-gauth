import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CatInputType, CatType } from './cat.dto';
import { CatService } from './cat.service';


@Resolver()
export class CatResolver {
    constructor(private readonly catService: CatService) { }

    @Query(returns => [CatType])
    async cats() {
        return this.catService.findAll();
    }
    @Mutation(returns => CatType)
    async createCat(@Args('input') input: CatInputType) {
        return this.catService.create(input);
    }
    @Mutation(returns => CatType)
    async updateCat(@Args('id') id: string, @Args('input') input: CatInputType) {
        return this.catService.update(id, input);
    }
    @Mutation(returns => CatType)
    async deleteCat(@Args('id') id: string) {
        return this.catService.delete(id);
    }
}