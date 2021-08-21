# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_08_21_212319) do

  create_table "covid_location_of_interests", force: :cascade do |t|
    t.string "site"
    t.text "alert_details"
    t.date "alert_date"
    t.text "alert_times"
    t.string "status"
    t.string "alert_type"
    t.float "latitude"
    t.float "longitude"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "venue"
    t.string "nz_id"
  end

  create_table "kafka_messages", force: :cascade do |t|
    t.text "topic"
    t.integer "partition"
    t.datetime "create_time"
    t.text "key"
    t.integer "offset"
    t.json "value"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "parsed", default: false
  end

end
