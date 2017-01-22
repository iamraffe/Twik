class CreateArchives < ActiveRecord::Migration[5.0]
  def change
    create_table :archives do |t|
      t.string :name
      t.references :menu, index: true
      t.json :meta
      t.json :components
      t.json :sections
      t.json :component_styles
      t.attachment :preview
      t.string :subdomain
      t.references :template, index: true
      t.references :society, index: true
      t.timestamps
    end
  end
end
