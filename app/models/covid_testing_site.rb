# == Schema Information
#
# Table name: covid_testing_sites
#
#  id         :integer          not null, primary key
#  latitude   :float
#  longitude  :float
#  location   :text
#  loc_id     :integer
#  name       :text
#  url        :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class CovidTestingSite < ApplicationRecord
end
