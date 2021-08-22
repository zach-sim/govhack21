class FetchAllJob < ApplicationJob  
  def perform
    [
      NswCovidTestingSitesJob,
      NzCovidDataLocationOfInterestSyncJob,
      NzCovidTestingSitesJob,
      NzCovidVaccinationSitesJob,
      VicCovidTestingSitesJob,
      VicCovidVaccinationSitesJob,
    ].shuffle.each do |job|
      if Rails.env.developement?
        job.perform_now
      else
        job.perform_later
      end
    end
  end
end
