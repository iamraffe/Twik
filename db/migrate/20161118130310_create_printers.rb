class CreatePrinters < ActiveRecord::Migration[5.0]
  def change
    create_table :printers do |t|
      t.string :name
      t.string :email
      t.string :contact
      t.boolean :default
      t.timestamps
    end
  end
end
