require 'faraday'
class NzCovidVaccinationSitesJob < ApplicationJob
  queue_as :default

  def perform
    url = "https://www.healthpoint.co.nz/geo.do?zoom=18&lat=&lng=&region=&addr=&branch=covid-19-vaccination&options=anyone"
    response = Faraday.get url
    data = JSON.parse(response.body)
    results = data["results"]
    
    ids = []
    results.each do |result|
      id = result['id']
      record = CovidVaccinationSite.where(location: 'NZ', loc_id: id).first_or_initialize
      record.update(
        latitude: result['lat'].to_f,
        longitude: result['lng'].to_f,
        name: result['name'],
        url: "https://www.healthpoint.co.nz#{result['url']}",
      )
      ids << id
    end
    CovidVaccinationSite.where(location: 'NZ').where.not(loc_id: ids).delete_all
  end
end
