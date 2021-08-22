require 'faraday'
class NzCovidTestingSitesJob < ApplicationJob
  queue_as :default

  def perform
    url = "https://www.healthpoint.co.nz/geo.do?zoom=18&lat=&lng=&region=&addr=&branch=covid-19&options=anyone&covidTesting="
    response = Faraday.get url
    data = JSON.parse(response.body)
    results = data["results"]
    
    ids = []
    results.each do |result|
      id = result['id']
      record = CovidTestingSite.where(location: 'NZ', loc_id: id).first_or_initialize
      record.update(
        latitude: result['lat'].to_f,
        longitude: result['lng'].to_f,
        name: result['name'],
        url: "https://www.healthpoint.co.nz#{result['url']}",
      )
      ids << id
    end
    CovidTestingSite.where(location: 'NZ').where.not(loc_id: ids).delete_all
  end
end
