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

ActiveRecord::Schema.define(version: 20170323043429) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string   "subdomain"
    t.integer  "owner_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "archives", force: :cascade do |t|
    t.string   "name"
    t.integer  "menu_id"
    t.string   "preview_file_name"
    t.string   "preview_content_type"
    t.integer  "preview_file_size"
    t.datetime "preview_updated_at"
    t.string   "rendered_pdf_file_name"
    t.string   "rendered_pdf_content_type"
    t.integer  "rendered_pdf_file_size"
    t.datetime "rendered_pdf_updated_at"
    t.string   "subdomain"
    t.integer  "template_id"
    t.integer  "society_id"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.index ["menu_id"], name: "index_archives_on_menu_id", using: :btree
    t.index ["society_id"], name: "index_archives_on_society_id", using: :btree
    t.index ["template_id"], name: "index_archives_on_template_id", using: :btree
  end

  create_table "images", force: :cascade do |t|
    t.string   "title"
    t.string   "file_file_name"
    t.string   "file_content_type"
    t.integer  "file_file_size"
    t.datetime "file_updated_at"
    t.boolean  "private"
    t.string   "imageable_type"
    t.integer  "imageable_id"
    t.integer  "user_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.index ["imageable_type", "imageable_id"], name: "index_images_on_imageable_type_and_imageable_id", using: :btree
    t.index ["user_id"], name: "index_images_on_user_id", using: :btree
  end

  create_table "menus", force: :cascade do |t|
    t.string   "name"
    t.string   "orientation"
    t.string   "layout"
    t.string   "size"
    t.json     "meta"
    t.json     "components"
    t.json     "sections"
    t.json     "component_styles"
    t.string   "preview_file_name"
    t.string   "preview_content_type"
    t.integer  "preview_file_size"
    t.datetime "preview_updated_at"
    t.string   "rendered_pdf_file_name"
    t.string   "rendered_pdf_content_type"
    t.integer  "rendered_pdf_file_size"
    t.datetime "rendered_pdf_updated_at"
    t.string   "subdomain"
    t.integer  "template_id"
    t.integer  "society_id"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.json     "wildcards"
    t.index ["society_id"], name: "index_menus_on_society_id", using: :btree
    t.index ["template_id"], name: "index_menus_on_template_id", using: :btree
  end

  create_table "printers", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "contact"
    t.boolean  "default"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "societies", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "templates", force: :cascade do |t|
    t.string   "name"
    t.json     "structure"
    t.boolean  "canon"
    t.uuid     "ext"
    t.text     "allows",     default: [],              array: true
    t.text     "accepts",    default: [],              array: true
    t.text     "printAt",    default: [],              array: true
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.text     "wildcards",  default: [],              array: true
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
    t.boolean  "subscribed"
    t.string   "stripe_id"
    t.string   "subscription_id"
    t.date     "subscription_end"
    t.string   "phone"
    t.string   "title"
    t.string   "organization"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string   "authentication_token"
    t.string   "subdomain"
    t.string   "invitation_token"
    t.datetime "invitation_created_at"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer  "invitation_limit"
    t.string   "invited_by_type"
    t.integer  "invited_by_id"
    t.integer  "invitations_count",      default: 0
    t.integer  "role"
    t.index ["authentication_token"], name: "index_users_on_authentication_token", unique: true, using: :btree
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["invitation_token"], name: "index_users_on_invitation_token", unique: true, using: :btree
    t.index ["invitations_count"], name: "index_users_on_invitations_count", using: :btree
    t.index ["invited_by_id"], name: "index_users_on_invited_by_id", using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

end
