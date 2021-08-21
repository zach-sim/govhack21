class ApplicationJob < ActiveJob::Base
  # Automatically retry jobs that encountered a deadlock
  # retry_on ActiveRecord::Deadlocked
  
  around_perform do |job, block|
    ActiveRecord::Base.transaction do
      block.call
    end
  end

  if Rails.env.production?
    require 'sidekiq/api'
    def self.enqueue(time: Time.now, wait: 0)
      enqueue_time = time + wait
      jobs = Sidekiq::ScheduledSet.new.to_a
      jobs.each do |job|
        job.delete if job.args.first['job_class'] == self.name && job.at <= time
      end
      self.set(wait_until: enqueue_time).perform_later
    end
  else
    def self.enqueue(time: Time.now, wait: 0)
      enqueue_time = time + wait
      self.set(wait_until: enqueue_time).perform_later
    end
  end

  # Most jobs are safe to ignore if the underlying records are no longer available
  # discard_on ActiveJob::DeserializationError
end
