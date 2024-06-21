import graphene
import photos.schema


class Query(photos.schema.Query, graphene.ObjectType):
    pass


class Mutation(photos.schema.Mutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
