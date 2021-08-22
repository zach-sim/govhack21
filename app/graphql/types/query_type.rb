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
      CovidLocationOfInterest.where(nz_id: nil, status: 'active').or(
        CovidLocationOfInterest.where.not(nz_id: nil)
      ).order(:alert_date)
    end

    field :covid_loc, CovidLocType, null: false,
      description: 'Get a specific covid location of interest'  do
        argument :id, ID, required: true
      end
    def covid_loc(id:)
      CovidLocationOfInterest.find(id)
    end

    
    field :covid_testing_sites, [CovidTsType], null: false,
      description: "Covid testing sites"
    def covid_testing_sites
      CovidTestingSite.all.where.not(latitude: nil, longitude: nil)
    end

    field :covid_testing_site, CovidTsType, null: false,
      description: 'Get a specific covid testing site'  do
        argument :id, ID, required: true
      end
    def covid_testing_site(id:)
      CovidTestingSite.find(id)
    end

    
    field :covid_vaccination_sites, [CovidVsType], null: false,
      description: "Covid testing sites"
    def covid_vaccination_sites
      CovidVaccinationSite.where.not(latitude: nil, longitude: nil)
    end

    field :covid_vaccination_site, CovidVsType, null: false,
      description: 'Get a specific covid testing site'  do
        argument :id, ID, required: true
      end
    def covid_vaccination_site(id:)
      CovidVaccinationSite.find(id)
    end
  end
end
