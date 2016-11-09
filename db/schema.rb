# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161028003943) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string   "subdomain"
    t.integer  "owner_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "archives", force: :cascade do |t|
    t.datetime "version"
    t.string   "name"
    t.json     "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "items", force: :cascade do |t|
    t.string   "text"
    t.integer  "position"
    t.integer  "category_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["category_id"], name: "index_items_on_category_id", using: :btree
  end

  create_table "menus", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.string   "orientation", default: "landscape"
    t.json     "template",    default: "[]",        null: false
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.float    "height"
    t.float    "width"
    t.string   "background"
  end

  create_table "sections", force: :cascade do |t|
    t.integer  "menu_id"
    t.string   "title"
    t.text     "text"
    t.integer  "position"
    t.string   "portrait_positioning"
    t.string   "landscape_positioning"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.index ["menu_id"], name: "index_sections_on_menu_id", using: :btree
  end

  create_table "uploads", force: :cascade do |t|
    t.string   "mediable_type"
    t.integer  "mediable_id"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.string   "mediable_file_name"
    t.string   "mediable_content_type"
    t.integer  "mediable_file_size"
    t.datetime "mediable_updated_at"
    t.index ["mediable_type", "mediable_id"], name: "index_uploads_on_mediable_type_and_mediable_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "name"
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: ""
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "invitation_token"
    t.datetime "invitation_created_at"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer  "invitation_limit"
    t.string   "invited_by_type"
    t.integer  "invited_by_id"
    t.integer  "invitations_count",      default: 0
    t.integer  "role"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["invitation_token"], name: "index_users_on_invitation_token", unique: true, using: :btree
    t.index ["invitations_count"], name: "index_users_on_invitations_count", using: :btree
    t.index ["invited_by_id"], name: "index_users_on_invited_by_id", using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

end
