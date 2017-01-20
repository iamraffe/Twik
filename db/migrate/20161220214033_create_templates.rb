class CreateTemplates < ActiveRecord::Migration[5.0]
  def change
    create_table :templates do |t|
      t.string :name
      t.json :structure
      t.boolean :canon
      t.uuid :ext
      t.text :allows, array: true, default: []
      t.timestamps
    end
  end
end
