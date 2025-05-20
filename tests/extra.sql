-- s3 bucket
insert into
    storage.buckets (id, name, file_size_limit)
values
    (
        'images',
        'images',
        52428800
    );

create policy "Full Public Access" 
on storage.objects for all 
using (bucket_id = 'images')
with check (bucket_id = 'images');

-- auth trigger
    create or replace function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profile (id)
  values (new.id);

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
