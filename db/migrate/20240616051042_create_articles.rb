class CreateArticles < ActiveRecord::Migration[7.1]
  def change
    create_table :articles do |t|
      t.references :user, null: false
      t.string :content
      t.timestamps
    end
  end
end
