import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OwnerInputType, OwnerType } from './owner.dto';
import { OwnerService } from './owner.service';


@Resolver()
export class OwnerResolver {
    constructor(private readonly ownerService: OwnerService) { }

    @Query(returns => [OwnerType])
    async owners() {
        return this.ownerService.findAll();
    }
    @Mutation(returns => OwnerType)
    async createOwner(@Args('input') input: OwnerInputType) {
        return this.ownerService.create(input);
    }
    @Mutation(returns => OwnerType)
    async updateOwner(@Args('id') id: string, @Args('input') input: OwnerInputType) {
        return this.ownerService.update(id, input);
    }
    @Mutation(returns => OwnerType)
    async deleteOwner(@Args('id') id: string) {
        return this.ownerService.delete(id);
    }
}