class CreateItems < ActiveRecord::Migration[5.0]
  def change
    create_table :items do |t|
      t.string :text
      t.integer :position
      t.references :category, index: true
      t.timestamps
    end
  end
end
