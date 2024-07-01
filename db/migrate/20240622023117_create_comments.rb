class CreateComments < ActiveRecord::Migration[7.1]
  def change
    create_table :comments do |t|
      t.references :article, null: false
      t.references :user, null: false
      t.string :content, null: false
      t.timestamps
    end
  end
end
