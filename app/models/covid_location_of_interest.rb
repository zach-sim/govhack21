# == Schema Information
#
# Table name: covid_location_of_interests
#
#  id            :integer          not null, primary key
#  site          :string
#  alert_details :text
#  alert_date    :date
#  alert_times   :text
#  status        :string
#  alert_type    :string
#  latitude      :float
#  longitude     :float
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  venue         :string
#  nz_id         :string
#
class CovidLocationOfInterest < ApplicationRecord
end
