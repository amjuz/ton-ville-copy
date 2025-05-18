insert into
  storage.buckets (id, name, file_size_limit)
values
  ('images', 'images', 52428800);
  
CREATE POLICY "Give anon users access to JPG images in folder 1ffg0oo_0" ON storage.objects FOR SELECT TO public USING (bucket_id = 'images' AND storage."extension"(name) = 'jpg' AND LOWER((storage.foldername(name))[1]) = 'public' AND auth.role() = 'anon');

CREATE POLICY "Give anon users access to JPG images in folder 1ffg0oo_1" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'images' AND storage."extension"(name) = 'jpg' AND LOWER((storage.foldername(name))[1]) = 'public' AND auth.role() = 'anon');