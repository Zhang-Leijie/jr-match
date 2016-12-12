defmodule TodoList do
    
    def new do
        HashDict.new
    end

    def add_entry(todo_list, date, title) do
        HashDict.update(todo_list, date, [title], fn (titles) do [title | titles] end)
    end

    def entries(todo_list, date) do
        HashDict.get(todo_list, date, [])
    end
end
