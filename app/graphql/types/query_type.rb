module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    field :covid_locs, [CovidLocType], null: false,
      description: "Covid locations of interest"
    def covid_locs
      CovidLocationOfInterest.where(nz_data: false, status: 'active').or(
        CovidLocationOfInterest.where(nz_data: true)
      )
    end
  end
end
