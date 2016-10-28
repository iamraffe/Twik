class CreateSections < ActiveRecord::Migration[5.0]
  def change
    create_table :sections do |t|
      t.references :menu, index: true
      t.string :title
      t.text :text
      t.integer :position
      t.timestamps
    end
  end
end
