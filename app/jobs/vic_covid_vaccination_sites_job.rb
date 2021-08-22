require 'faraday'
require 'csv'
class VicCovidVaccinationSitesJob < ApplicationJob
  queue_as :default

  def perform
    response = http_get("https://docs.google.com", "/spreadsheets/d/e/2PACX-1vSHdUAcVh82EV-G7MdWUD2Aq6oJ-M1GC2Zh_Y7_ClEnAVxXpxuTCY0DxHmbkxoTldmbCR79FcXN8qbQ/pub?gid=737686000&single=true&output=csv")
    body = response.body.encode('UTF-8', invalid: :replace, undef: :replace, replace: '')
    results = CSV.parse(body, headers: true)
    
    ids = []
    results.each do |result|
      id = result['id']
      record = CovidVaccinationSite.where(location: 'VIC', loc_id: id).first_or_initialize
      record.update(
        latitude: result['lat'].to_f,
        longitude: result['lng'].to_f,
        name: result['shortName'],
      )
      ids << id
    end
    CovidVaccinationSite.where(location: 'VIC').where.not(loc_id: ids).delete_all
  end

  private
  def http_get(base, uri)
    faraday_with_default_adapter(base) { | connection |
      connection.use FaradayMiddleware::FollowRedirects, limit: 1
    }.get(uri)
  end

  def faraday_with_default_adapter(base, &block)
    Faraday.new(base) { | connection |
      yield connection
  
      # IMPORTANT Without this line, nothing will happen.
      connection.adapter Faraday.default_adapter
    }
  end
end
