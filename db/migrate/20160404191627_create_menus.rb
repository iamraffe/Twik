class CreateMenus < ActiveRecord::Migration
  def change
    create_table :menus do |t|
      t.string :name
      t.string :orientation
      t.string :layout
      t.string :size
      t.json :meta
      t.json :components
      t.json :sections
      t.json :component_styles
      t.attachment :preview
      t.attachment :rendered_pdf
      t.string :subdomain
      t.references :template, index: true
      t.references :society, index: true
      t.timestamps null: false
    end
  end
end
