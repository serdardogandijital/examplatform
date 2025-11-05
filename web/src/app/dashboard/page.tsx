'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { userAPI } from '@/lib/api';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, loading } = useAuthStore();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [exams, setExams] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, examsRes] = await Promise.all([
          userAPI.getProfile(),
          userAPI.getUserExams()
        ]);
        setProfile(profileRes.data.data);
        setExams(examsRes.data.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-600">Exam Platform</h1>
          <div className="flex gap-4">
            <Link href="/exams" className="btn-secondary">
              Browse Exams
            </Link>
            <button className="btn-primary">Logout</button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {profile?.examsTaken || 0}
            </div>
            <div className="text-gray-600">Exams Taken</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {profile?.certificatesEarned || 0}
            </div>
            <div className="text-gray-600">Certificates</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {exams.filter((e) => e.passed).length}
            </div>
            <div className="text-gray-600">Passed</div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Recent Exams</h2>
          {exams.length === 0 ? (
            <p className="text-gray-600">No exams taken yet</p>
          ) : (
            <div className="space-y-4">
              {exams.map((exam) => (
                <div
                  key={exam.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">{exam.examTitle}</h3>
                    <p className="text-sm text-gray-600">
                      Score: {exam.score}% | {exam.passed ? '✅ Passed' : '❌ Failed'}
                    </p>
                  </div>
                  <Link
                    href={`/results/${exam.id}`}
                    className="text-primary-600 hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

