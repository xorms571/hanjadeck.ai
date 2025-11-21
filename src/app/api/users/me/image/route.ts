import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/prisma';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(request: Request): Promise<NextResponse> {
  const user = await getCurrentUser();
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ message: 'No file to upload.' }, { status: 400 });
  }

  const filePath = `avatars/${user.id}-${Date.now()}`;

  try {
    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('userImages')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      throw new Error(uploadError.message);
    }

    // Get the public URL of the uploaded file
    const { data: urlData } = supabase.storage
      .from('userImages')
      .getPublicUrl(filePath);

    if (!urlData.publicUrl) {
      throw new Error('Could not get public URL for the uploaded file.');
    }
    
    const publicUrl = urlData.publicUrl;

    // Update user's imageUrl in the database
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { imageUrl: publicUrl },
    });

    return NextResponse.json({ imageUrl: updatedUser.imageUrl });

  } catch (error: any) {
    console.error('Image upload error:', error);
    return NextResponse.json({ message: error.message || 'Failed to upload image.' }, { status: 500 });
  }
}